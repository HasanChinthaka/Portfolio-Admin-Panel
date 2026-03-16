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

export function ClientEdit() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    setValue,
    refineCore: { onFinish, query },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "clients" } });

  const record = query?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("name", record.name ?? "");
      setValue("website", record.website ?? "");
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

  return (
    <Edit saveButtonProps={customSave} resource="clients">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Client Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("website")}
          label="Website URL"
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
          {record?.logo && (
            <Box mb={1}>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Current Logo
              </Typography>
              <Avatar
                src={record.logo}
                variant="rounded"
                sx={{ width: 60, height: 60 }}
              />
            </Box>
          )}
          <Button variant="outlined" component="label">
            Replace Logo
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
