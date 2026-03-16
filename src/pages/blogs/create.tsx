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

export function BlogCreate() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "blogs" } });

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

  return (
    <Create saveButtonProps={customSave} resource="blogs">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("title", { required: "Title is required" })}
          label="Title"
          error={!!errors.title}
          helperText={errors.title?.message as string}
          fullWidth
        />
        <TextField
          {...register("content", { required: "Content is required" })}
          label="Content"
          multiline
          rows={8}
          error={!!errors.content}
          helperText={errors.content?.message as string}
          fullWidth
        />
        <TextField
          {...register("author")}
          label="Author"
          defaultValue="Hasan Chinthaka"
          fullWidth
        />
        <TextField
          {...register("tags")}
          label="Tags (comma-separated)"
          helperText="e.g. react, javascript, tutorial"
          fullWidth
        />
        <TextField
          {...register("publishedAt")}
          label="Published At"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField {...register("url")} label="External URL" fullWidth />
        <Controller
          name="isPublished"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Published"
            />
          )}
        />
        <Box>
          <Button variant="outlined" component="label">
            Upload Cover Image
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
