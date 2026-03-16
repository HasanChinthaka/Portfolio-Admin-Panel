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

export function WorkExperienceEdit() {
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
  } = useForm({ refineCoreProps: { resource: "work-experiences" } });

  const record = query?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("title", record.title ?? "");
      setValue("company", record.company ?? "");
      setValue("company_site", record.company_site ?? "");
      setValue("startDate", record.startDate?.substring(0, 10) ?? "");
      setValue("endDate", record.endDate?.substring(0, 10) ?? "");
      setValue("responsibilities", (record.responsibilities ?? []).join("\n"));
      setValue("isPublic", record.isPublic ?? true);
    }
  }, [record]);

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

  const displaySrc = previewUrl ?? record?.logo ?? null;

  return (
    <Edit saveButtonProps={customSave} resource="work-experiences">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("title", { required: "Title is required" })}
          label="Job Title"
          error={!!errors.title}
          helperText={errors.title?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("company", { required: "Company is required" })}
          label="Company"
          error={!!errors.company}
          helperText={errors.company?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("company_site")}
          label="Company Website URL"
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
          {...register("responsibilities")}
          label="Responsibilities (one per line)"
          multiline
          rows={5}
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
              <Box
                component="img"
                src={displaySrc}
                alt="preview"
                sx={{ maxWidth: 120, maxHeight: 120, objectFit: "contain", display: "block", borderRadius: 1, border: "1px solid", borderColor: "divider" }}
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
