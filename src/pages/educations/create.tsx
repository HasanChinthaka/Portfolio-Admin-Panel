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

export function EducationCreate() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "educations" } });

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const payload: Record<string, any> = { ...values };
      if (imageFile) payload.image = imageFile;
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="educations">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("institute", { required: "Institute is required" })}
          label="Institute"
          error={!!errors.institute}
          helperText={errors.institute?.message as string}
          fullWidth
        />
        <TextField
          {...register("degree", { required: "Degree is required" })}
          label="Degree"
          error={!!errors.degree}
          helperText={errors.degree?.message as string}
          fullWidth
        />
        <TextField {...register("fieldOfStudy")} label="Field of Study" fullWidth />
        <TextField
          {...register("startDate")}
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("endDate")}
          label="End Date (leave empty if ongoing)"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField {...register("grade")} label="Grade / GPA" fullWidth />
        <TextField
          {...register("description")}
          label="Description"
          multiline
          rows={3}
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
            Upload Logo
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
