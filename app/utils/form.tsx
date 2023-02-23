import type { ReactNode } from "react";
import { useEffect } from "react";
import type { z } from "zod";

type FormErrors =
  | {
      fieldErrors: Record<string, string[]> | null;
      formErrors: string[] | null;
    }
  | undefined;

type ElementProps = {
  name: string;
  id: string;
  "aria-invalid": true | undefined;
  "aria-describedby": string | undefined;
};

export function ErrorsList({
  name,
  errors,
}: {
  name: string;
  errors: string[];
}) {
  return (
    <ul id={`${name}-error`}>
      {errors.map((e) => (
        <li className="text-sm text-red-700" key={e}>
          {e}
        </li>
      ))}
    </ul>
  );
}

export function useForm({
  name,
  formRef,
  schema,
  errors,
}: {
  name: string;
  formRef: React.RefObject<HTMLFormElement>;
  schema: z.AnyZodObject;
  errors: FormErrors;
}) {
  const fieldNames = Object.keys(schema.shape);

  const fields: Record<
    string,
    {
      props: ElementProps;
      errors?: ReactNode;
    }
  > = {};

  fieldNames.forEach((field) => {
    const fieldErrors = errors?.fieldErrors?.[field];
    fields[field] = {
      props: {
        name: field,
        id: field,
        "aria-invalid": fieldErrors?.length ? true : undefined,
        "aria-describedby": fieldErrors?.length
          ? `${name}-${field}-error`
          : undefined,
      },
      errors: fieldErrors?.length && (
        <ErrorsList name={`${name}-${field}`} errors={fieldErrors} />
      ),
    };
  });

  useEffect(() => {
    if (!formRef.current || !errors) return;
    if (errors.formErrors?.length) {
      formRef.current.focus();
    } else {
      const invalidElement = formRef.current.querySelector("[aria-invalid]");
      if (invalidElement instanceof HTMLElement) invalidElement.focus();
    }
  }, [formRef, errors]);

  return {
    form: {
      props: {
        ref: formRef,
        "aria-invalid": errors?.formErrors?.length ? true : undefined,
        "aria-describedby": errors?.formErrors?.length
          ? `form-${name}-error`
          : undefined,
      },
      errors: errors?.formErrors?.length && (
        <ErrorsList name={`form-${name}`} errors={errors.formErrors} />
      ),
    },
    fields,
  };
}
