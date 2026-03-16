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

export function ServiceCreate() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "services" } });

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const payload: Record<string, any> = { ...values };
      if (imageFile) payload.image = imageFile;
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="services">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("title", { required: "Title is required" })}
          label="Title"
          error={!!errors.title}
          helperText={errors.title?.message as string}
          fullWidth
        />
        <TextField
          {...register("description", { required: "Description is required" })}
          label="Description"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message as string}
          fullWidth
        />
        <TextField
          {...register("color")}
          label="Color (hex, e.g. #FF5733)"
          fullWidth
        />
        <TextField
          {...register("colorRGB")}
          label="Color RGB (e.g. 255, 87, 51)"
          fullWidth
        />
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
