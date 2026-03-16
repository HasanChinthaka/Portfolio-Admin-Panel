import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {
  Stack,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";

export function ContactInfoCreate() {
  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "contact-info" } });

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
    <Create saveButtonProps={customSave} resource="contact-info">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          fullWidth
        />
        <TextField
          {...register("value", { required: "Value is required" })}
          label="Value (comma-separated)"
          error={!!errors.value}
          helperText={(errors.value?.message as string) || "e.g. hello@email.com, +1234567890"}
          fullWidth
        />
        <TextField {...register("link")} label="Link (URL)" fullWidth />
        <TextField {...register("icon")} label="Icon" fullWidth />
        <TextField {...register("color")} label="Color" fullWidth />
        <Controller
          name="isPublic"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Public"
            />
          )}
        />
      </Stack>
    </Create>
  );
}
