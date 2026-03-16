import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Stack, TextField } from "@mui/material";

export function SkillCategoryCreate() {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "skills-category" } });

  return (
    <Create saveButtonProps={saveButtonProps} resource="skills-category">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          fullWidth
        />
      </Stack>
    </Create>
  );
}
