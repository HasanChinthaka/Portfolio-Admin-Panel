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

export function BlogEdit() {
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
  } = useForm({ refineCoreProps: { resource: "blogs" } });

  const record = query?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("title", record.title ?? "");
      setValue("content", record.content ?? "");
      setValue("author", record.author ?? "");
      setValue("tags", (record.tags ?? []).join(", "));
      setValue("publishedAt", record.publishedAt?.substring(0, 10) ?? "");
      setValue("url", record.url ?? "");
      setValue("isPublished", record.isPublished ?? true);
    }
  }, [record]);

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const tags = (values.tags as string)
        ? (values.tags as string).split(",").map((t: string) => t.trim()).filter(Boolean)
        : [];
      const payload: Record<string, any> = { ...values, tags };
      if (imageFile) payload.image = imageFile;
      onFinish(payload);
    }),
  };

  const displaySrc = previewUrl ?? record?.image ?? null;

  return (
    <Edit saveButtonProps={customSave} resource="blogs">
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
          {...register("content", { required: "Content is required" })}
          label="Content"
          multiline
          rows={8}
          error={!!errors.content}
          helperText={errors.content?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("author")}
          label="Author"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("tags")}
          label="Tags (comma-separated)"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("publishedAt")}
          label="Published At"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("url")}
          label="External URL"
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
          {displaySrc && (
            <Box mb={1}>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                {previewUrl ? "New Image Preview" : "Current Image"}
              </Typography>
              <Box
                component="img"
                src={displaySrc}
                alt="preview"
                sx={{ maxWidth: 300, maxHeight: 180, objectFit: "cover", display: "block", borderRadius: 1, border: "1px solid", borderColor: "divider" }}
              />
            </Box>
          )}
          <Button variant="outlined" component="label">
            {record?.image ? "Replace Image" : "Upload Image"}
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
