import { useState } from "react";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Box,
} from "@mui/material";

export function WorkExperienceCreate() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "work-experiences" } });

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const responsibilities = (values.responsibilities as string)
        .split("\n")
        .map((r: string) => r.trim())
        .filter(Boolean);
      const payload: Record<string, any> = { ...values, responsibilities };
      if (imageFile) payload.image = imageFile;
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="work-experiences">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("title", { required: "Title is required" })}
          label="Job Title"
          error={!!errors.title}
          helperText={errors.title?.message as string}
          fullWidth
        />
        <TextField
          {...register("company", { required: "Company is required" })}
          label="Company"
          error={!!errors.company}
          helperText={errors.company?.message as string}
          fullWidth
        />
        <TextField {...register("company_site")} label="Company Website URL" fullWidth />
        <TextField
          {...register("startDate")}
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("endDate")}
          label="End Date (leave empty if current)"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("responsibilities")}
          label="Responsibilities (one per line)"
          multiline
          rows={5}
          helperText="Enter each responsibility on a new line"
          fullWidth
        />
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
        <Box>
          <Button variant="outlined" component="label">
            Upload Company Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </Button>
          {imageFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {imageFile.name}
            </Typography>
          )}
        </Box>
      </Stack>
    </Create>
  );
}
