
import { onboardingSchema } from "@/schemas/form.schema";

const iso = (d: Date) => d.toISOString().split("T")[0];
const today = new Date();
const tomorrowStr = iso(new Date(today.getTime() + 24 * 60 * 60 * 1000));
const yesterdayStr = iso(new Date(today.getTime() - 24 * 60 * 60 * 1000));

const baseValid = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  companyName: "Analytical Engines Ltd",
  services: ["UI/UX", "Web Dev"] as string[],
  projectStartDate: tomorrowStr, 
  acceptTerms: true,
  budgetUsd: 5000,
};

describe("onboardingSchema", () => {
  test("valid input passes", () => {
    const r = onboardingSchema.safeParse(baseValid);
    expect(r.success).toBe(true);
  });

  test("invalid email + empty name fails", () => {
    const r = onboardingSchema.safeParse({
      ...baseValid,
      fullName: "",
      email: "not-an-email",
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      const issues = r.error.issues;

      // fullName: at least one error on fullName and one of them should be 'too_small'
      const fullNameIssues = issues.filter(i => i.path.join(".") === "fullName");
      expect(fullNameIssues.length).toBeGreaterThan(0);
      expect(fullNameIssues.map(i => i.code)).toEqual(
        expect.arrayContaining(["too_small"])
      );

      // email: accept either 'invalid_string' or 'invalid_format' across Zod versions
      const emailIssues = issues.filter(i => i.path.join(".") === "email");
      const emailCodes = emailIssues.map(i => i.code);
      const allowed = ["invalid_string", "invalid_format"];
      expect(emailCodes.some(c => allowed.includes(c))).toBe(true);
    }
  });

  test("services must have at least one item", () => {
    const r = onboardingSchema.safeParse({
      ...baseValid,
      services: [],
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.map(i => i.path[0])).toContain("services");
    }
  });

  test("services must be from the enum", () => {
    const r = onboardingSchema.safeParse({
      ...baseValid,
      services: ["SEO"], // not in ServicesEnum
    });
    expect(r.success).toBe(false);
    if (!r.success) {
     
      const issue = r.error.issues.find(i =>
        i.path.join(".").startsWith("services")
      );
      expect(issue).toBeTruthy();
     
      expect(
        ["invalid_enum_value", "invalid_value", "invalid_type"].includes(
          issue!.code as string
        )
      ).toBe(true);
    }
  });

  test("budgetUsd is optional but must be integer within range if present", () => {
    const ok = onboardingSchema.safeParse({ ...baseValid, budgetUsd: undefined });
    expect(ok.success).toBe(true);

    const nonInt = onboardingSchema.safeParse({ ...baseValid, budgetUsd: 100.5 });
    expect(nonInt.success).toBe(false);

    const tooSmall = onboardingSchema.safeParse({ ...baseValid, budgetUsd: 50 });
    expect(tooSmall.success).toBe(false);
  });

  test("projectStartDate must be today or later", () => {
    const past = onboardingSchema.safeParse({
      ...baseValid,
      projectStartDate: yesterdayStr,
    });
    expect(past.success).toBe(false);
    if (!past.success) {
      const msg = past.error.issues.find(i => i.path[0] === "projectStartDate")?.message;
      expect(msg).toMatch(/today or later/i);
    }
  });

  test("acceptTerms must be true", () => {
    const r = onboardingSchema.safeParse({ ...baseValid, acceptTerms: false });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.map(i => i.path[0])).toContain("acceptTerms");
    }
  });

  test("unknown keys are stripped (schema not strict)", () => {
    const r = onboardingSchema.safeParse({ ...baseValid, extra: 123 });
    expect(r.success).toBe(true);
    if (r.success) {
      expect((r.data as any).extra).toBeUndefined();
    }
  });
});
