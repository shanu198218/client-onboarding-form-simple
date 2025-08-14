import InputField from '../common/form/input-field';
import ErrorText from '../common/form/error-text';
import { SERVICE_OPTIONS } from '../../../utils/data-utils';
import { fillDemoData, todayInputValue } from '../../../utils/helper-utils';
import Button from '../common/form/button';
import { OnboardingFormFieldsProps } from '../../../types/field.type';

export default function FormFields({
  register,
  errors,
  services,
  toggleService,
  isSubmitting,
  setValue,
  setServices,
  reset,
}: OnboardingFormFieldsProps) {

    
    
  return (
    <>
      <InputField
        label="Full name"
        required
        id="fullName"
        register={register('fullName')}
        error={errors.fullName?.message}
      />
      <InputField
      required
        label="Email"
        id="email"
        type="email"
        register={register('email')}
        error={errors.email?.message}
      />
      <InputField
      required
        label="Company name"
        id="companyName"
        register={register('companyName')}
        error={errors.companyName?.message}
      />

      <fieldset className="mb-4">
        <legend className="mb-1 block text-sm font-medium">Services interested in</legend>
       <div className="grid grid-cols-2 gap-2">
  {SERVICE_OPTIONS.map((svc) => (
    <label
      key={svc}
      className="inline-flex cursor-pointer items-center gap-2 rounded-lg p-2"
    >
      <input
        type="checkbox"
        className="h-4 w-4 appearance-none rounded-full border border-gray-500 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
        register={register('budgetUsd', { valueAsNumber: true })} 
        error={errors.budgetUsd?.message}
        props={{ min: 100, max: 1_000_000, step: 1 }}
      />

    <div className="mb-4">
        <label htmlFor="projectStartDate" className="block text-sm font-medium">
          Project start date
        </label>
        <input
          id="projectStartDate"
          required
          type="date"
          min={todayInputValue()}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("projectStartDate")}
        />
        {errors.projectStartDate && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {errors.projectStartDate.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" {...register('acceptTerms')} />
          <span className="text-sm">I accept the terms</span>
        </label>
        {errors.acceptTerms && <ErrorText>{errors.acceptTerms.message as string}</ErrorText>}
      </div>

<div className=' flex justify-between w-1/2'>
    <div><Button variant="primary" type="submit" isLoading={isSubmitting}>
        Submit
      </Button></div>


        <Button
          type="button"
          variant="secondary"
          onClick={() => fillDemoData(setValue, setServices)}
        >
          Demo
        </Button>

         <Button
          type="button"
          variant="danger"
          onClick={() => {
      reset();         
      setServices([]);  
    }}
        >
          Clear
        </Button>
</div>
      
    </>
  );
}
