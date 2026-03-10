import { useEffect } from "react";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {
  Stack,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";

export function ContactInfoEdit() {
  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    setValue,
    refineCore: { onFinish, queryResult },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "contact-info" } });

  const record = queryResult?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("name", record.name ?? "");
      setValue("value", (record.value ?? []).join(", "));
      setValue("link", record.link ?? "");
      setValue("icon", record.icon ?? "");
      setValue("color", record.color ?? "");
      setValue("isPublic", record.isPublic ?? true);
    }
  }, [record]);

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const value = (values.value as string)
        .split(",")
        .map((v: string) => v.trim())
        .filter(Boolean);
      onFinish({ ...values, value });
    }),
  };

  return (
    <Edit saveButtonProps={customSave} resource="contact-info">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("value", { required: "Value is required" })}
          label="Value (comma-separated)"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("link")}
          label="Link (URL)"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("icon")}
          label="Icon"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("color")}
          label="Color"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <Controller
          name="isPublic"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={!!field.value} />}
              label="Public"
            />
          )}
        />
      </Stack>
    </Edit>
  );
}
