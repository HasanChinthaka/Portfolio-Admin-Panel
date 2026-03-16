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
  Alert,
} from "@mui/material";

export function CVCreate() {
  const [cvFile, setCvFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "cv" } });

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      if (!cvFile) {
        alert("CV file (PDF) is required");
        return;
      }
      const payload: Record<string, any> = { ...values, cvFile };
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="cv">
      <Stack spacing={2} mt={2}>
        <Alert severity="info">
          Only PDF files are accepted. Max size: 5MB. If setting as public and a
          public CV already exists, you'll be prompted to confirm replacement.
        </Alert>

        <TextField
          {...register("name", { required: "Name is required" })}
          label="CV Label / Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          fullWidth
        />

        <Controller
          name="isPublic"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Public"
            />
          )}
        />

        <Box>
          <Button
            variant="outlined"
            component="label"
            color={!cvFile ? "error" : "primary"}
          >
            Upload CV (PDF, required)
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
            />
          </Button>
          {cvFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
            </Typography>
          )}
        </Box>
      </Stack>
    </Create>
  );
}
