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
  Avatar,
} from "@mui/material";

export function ServiceEdit() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    setValue,
    refineCore: { onFinish, query },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "services" } });

  const record = query?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("title", record.title ?? "");
      setValue("description", record.description ?? "");
      setValue("color", record.color ?? "");
      setValue("colorRGB", record.colorRGB ?? "");
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

  return (
    <Edit saveButtonProps={customSave} resource="services">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("title", { required: "Title is required" })}
          label="Title"
          error={!!errors.title}
          helperText={errors.title?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("description", { required: "Description is required" })}
          label="Description"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("color")}
          label="Color (hex)"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("colorRGB")}
          label="Color RGB"
          InputLabelProps={{ shrink: true }}
          fullWidth
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
          {record?.logo && (
            <Box mb={1}>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Current Logo
              </Typography>
              <Avatar src={record.logo} sx={{ width: 48, height: 48 }} />
            </Box>
          )}
          <Button variant="outlined" component="label">
            {record?.logo ? "Replace Logo" : "Upload Logo"}
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
    </Edit>
  );
}
