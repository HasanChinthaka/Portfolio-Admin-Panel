import { useState, useEffect } from "react";
import { useList } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Box,
} from "@mui/material";

export function TestimonialEdit() {
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
  } = useForm({ refineCoreProps: { resource: "testimonials" } });

  const record = query?.data?.data;
  const { result: clientsResult } = useList({ resource: "clients", pagination: { mode: "off" } });
  const clients = clientsResult?.data ?? [];

  useEffect(() => {
    if (record) {
      setValue("name", record.name ?? "");
      setValue("review", record.review ?? "");
      setValue("client", record.client?._id ?? record.client ?? "");
      setValue("isPublished", record.isPublished ?? true);
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

  const displaySrc = previewUrl ?? record?.avatar ?? null;

  return (
    <Edit saveButtonProps={customSave} resource="testimonials">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Reviewer Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("review", { required: "Review is required" })}
          label="Review"
          multiline
          rows={4}
          error={!!errors.review}
          helperText={errors.review?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <Controller
          name="client"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              <Select {...field} label="Client">
                <MenuItem value="">None</MenuItem>
                {clients.map((c: any) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="isPublished"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={!!field.value} />}
              label="Published"
            />
          )}
        />
        <Box>
          {displaySrc && (
            <Box mb={1}>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                {previewUrl ? "New Image Preview" : "Current Avatar"}
              </Typography>
              <img
                src={displaySrc}
                alt="preview"
                style={{ width: "80px", height: "80px", objectFit: "cover", display: "block", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </Box>
          )}
          <Button variant="outlined" component="label">
            {record?.avatar ? "Replace Avatar" : "Upload Avatar"}
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
