import InputField from "../common/form/input-field";
import ErrorText from "../common/form/error-text";
import { SERVICE_OPTIONS } from "../../../utils/data-utils";
import { todayInputValue } from "../../../utils/helper-utils";
import Button from "../common/form/button";
import { OnboardingFormFieldsProps } from "../../../types/field.type";

export default function FormFields({
  register,
  errors,
  services,
  toggleService,
  isSubmitting,
}: OnboardingFormFieldsProps) {
  return (
    <>
      <InputField label="Full name" id="fullName"  register={register("fullName")} error={errors.fullName?.message} />
      <InputField label="Email" id="email" type="email" register={register("email")} error={errors.email?.message} />
      <InputField label="Company name" id="companyName"  register={register("companyName")} error={errors.companyName?.message} />

      <fieldset className="mb-4">
        <legend className="block text-sm font-medium mb-1">Services interested in</legend>
        <div className="grid grid-cols-2 gap-2">
          {SERVICE_OPTIONS.map((svc) => (
            <label key={svc} className="inline-flex items-center gap-2 rounded-lg border p-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={services?.includes(svc) || false}
                onChange={() => toggleService(svc)}
              />
              <span className="text-sm">{svc}</span>
            </label>
          ))}
        </div>
        {errors.services && <ErrorText>{errors.services.message as string}</ErrorText>}
      </fieldset>

<InputField
  label="Budget (USD)"
  id="budgetUsd"
  type="number"
  register={register("budgetUsd", { valueAsNumber: true })} // pass the bound register
  error={errors.budgetUsd?.message}
  props={{ min: 100, max: 1_000_000, step: 1 }}
/>


      <InputField
        label="Project start date"
        id="projectStartDate"
        type="date"
        register={register("projectStartDate")}
        error={errors.projectStartDate?.message}
        props={{ min: todayInputValue() }}
      />

      <div className="mb-6">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" {...register("acceptTerms")} />
          <span className="text-sm">I accept the terms</span>
        </label>
        {errors.acceptTerms && <ErrorText>{errors.acceptTerms.message as string}</ErrorText>}
      </div>

      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </>
  );
}
