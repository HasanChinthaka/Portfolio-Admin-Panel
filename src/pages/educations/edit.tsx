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

export function EducationEdit() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    setValue,
    refineCore: { onFinish, query },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "educations" } });

  const record = query?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("institute", record.institute ?? "");
      setValue("degree", record.degree ?? "");
      setValue("fieldOfStudy", record.fieldOfStudy ?? "");
      setValue("startDate", record.startDate?.substring(0, 10) ?? "");
      setValue("endDate", record.endDate?.substring(0, 10) ?? "");
      setValue("grade", record.grade ?? "");
      setValue("description", record.description ?? "");
      setValue("isPublic", record.isPublic ?? true);
    }
  }, [record]);

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const payload: Record<string, any> = { ...values };
      if (imageFile) payload.image = imageFile;
      onFinish(payload);
    }),
  };

  const displaySrc = previewUrl ?? record?.logo ?? null;

  return (
    <Edit saveButtonProps={customSave} resource="educations">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("institute", { required: "Institute is required" })}
          label="Institute"
          error={!!errors.institute}
          helperText={errors.institute?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("degree", { required: "Degree is required" })}
          label="Degree"
          error={!!errors.degree}
          helperText={errors.degree?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("fieldOfStudy")}
          label="Field of Study"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("startDate")}
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("endDate")}
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("grade")}
          label="Grade / GPA"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("description")}
          label="Description"
          multiline
          rows={3}
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
        <Box>
          {displaySrc && (
            <Box mb={1}>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                {previewUrl ? "New Image Preview" : "Current Logo"}
              </Typography>
              <img
                src={displaySrc}
                alt="preview"
                style={{ maxWidth: "120px", maxHeight: "120px", objectFit: "contain", display: "block", borderRadius: "4px", border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </Box>
          )}
          <Button variant="outlined" component="label">
            {record?.logo ? "Replace Logo" : "Upload Logo"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                setPreviewUrl(file ? URL.createObjectURL(file) : null);
              }}
            />
          </Button>
          {imageFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {imageFile.name}
            </Typography>
          )}
        </Box>
      </Stack>
    </Edit>
  );
}
