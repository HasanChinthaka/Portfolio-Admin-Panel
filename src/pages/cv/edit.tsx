import { useState, useEffect } from "react";
import { Edit } from "@refinedev/mui";
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

const API_URL = import.meta.env.VITE_API_URL;

export function CVEdit() {
  const [cvFile, setCvFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    setValue,
    refineCore: { onFinish, queryResult },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "cv" } });

  const record = queryResult?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("name", record.name ?? "");
      setValue("isPublic", record.isPublic ?? false);
    }
  }, [record]);

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const payload: Record<string, any> = { ...values };
      if (cvFile) payload.cvFile = cvFile;
      onFinish(payload);
    }),
  };

  return (
    <Edit saveButtonProps={customSave} resource="cv">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="CV Label / Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Controller
          name="isPublic"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={!!field.value} />}
              label="Public"
            />
          )}
        />

        <Box>
          {record?.cv && (
            <Box mb={1}>
              <Button
                size="small"
                variant="outlined"
                href={`${API_URL}/admin/cv/download/${record.id}`}
                target="_blank"
              >
                Download Current PDF
              </Button>
            </Box>
          )}
          <Button variant="outlined" component="label">
            Replace CV File (PDF)
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
    </Edit>
  );
}
