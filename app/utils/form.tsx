import type { ReactNode } from "react";
import { useEffect } from "react";
import type { z } from "zod";

type ErrorList = string[] | null | undefined;

type FormErrors = {
  fieldErrors?: Record<string, ErrorList>;
  formErrors?: ErrorList;
};

type ElementData = {
  props: {
    name: string;
    id: string;
    "aria-invalid": true | undefined;
    "aria-describedby": string | undefined;
  };
  errors?: ReactNode;
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

function getFieldsData<Schema extends z.AnyZodObject>(
  schema: Schema,
  fieldErrors?: FormErrors["fieldErrors"]
) {
  const shape = schema.shape;
  type Key = keyof z.infer<typeof schema>;

  return Object.entries(shape).reduce((acc, entry) => {
    const [field] = entry as [Key, z.ZodTypeAny];
    const fieldName = String(field);
    const errors = fieldErrors?.[fieldName];

    acc[field] = {
      props: {
        name: fieldName,
        id: fieldName,
        "aria-invalid": errors?.length ? true : undefined,
        "aria-describedby": errors?.length ? `$${fieldName}-error` : undefined,
      },
      errors: errors?.length && <ErrorsList name={fieldName} errors={errors} />,
    };
    return acc;
  }, {} as Record<Key, ElementData>);
}

export function useForm<Schema extends z.AnyZodObject>({
  name,
  formRef,
  schema,
  errors,
}: {
  name: string;
  formRef: React.RefObject<HTMLFormElement>;
  schema: Schema;
  errors?: FormErrors;
}) {
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
          ? `${name}-error`
          : undefined,
      },
      errors: errors?.formErrors?.length && (
        <ErrorsList name={name} errors={errors.formErrors} />
      ),
    },
    fields: getFieldsData(schema, errors?.fieldErrors),
  };
}
