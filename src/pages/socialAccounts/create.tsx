import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Stack, TextField, FormControlLabel, Switch } from "@mui/material";

export function SocialAccountCreate() {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "social-account" } });

  return (
    <Create saveButtonProps={saveButtonProps} resource="social-account">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          fullWidth
        />
        <TextField
          {...register("link", { required: "Link is required" })}
          label="Link (URL)"
          error={!!errors.link}
          helperText={errors.link?.message as string}
          fullWidth
        />
        <TextField {...register("icon")} label="Icon" fullWidth />
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
