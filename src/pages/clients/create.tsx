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

export function ClientCreate() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "clients" } });

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      if (!imageFile) {
        alert("Client logo is required");
        return;
      }
      const payload: Record<string, any> = { ...values, image: imageFile };
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="clients">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Client Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          fullWidth
        />
        <TextField {...register("website")} label="Website URL" fullWidth />
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
          <Button variant="outlined" component="label" color={!imageFile ? "error" : "primary"}>
            Upload Logo (required)
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
