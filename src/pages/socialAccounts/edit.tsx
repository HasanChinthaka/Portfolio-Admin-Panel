import { useEffect } from "react";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Stack, TextField, FormControlLabel, Switch } from "@mui/material";

export function SocialAccountEdit() {
  const {
    saveButtonProps,
    register,
    control,
    setValue,
    refineCore: { queryResult },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "social-account" } });

  const record = queryResult?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("name", record.name ?? "");
      setValue("link", record.link ?? "");
      setValue("icon", record.icon ?? "");
      setValue("isPublic", record.isPublic ?? true);
    }
  }, [record]);

  return (
    <Edit saveButtonProps={saveButtonProps} resource="social-account">
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
          {...register("link", { required: "Link is required" })}
          label="Link (URL)"
          error={!!errors.link}
          helperText={errors.link?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("icon")}
          label="Icon"
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
