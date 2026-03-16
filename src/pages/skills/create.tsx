import { useState } from "react";
import { useList } from "@refinedev/core";
import { Create } from "@refinedev/mui";
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

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function SkillCreate() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "skills" } });

  const { result: categoriesResult } = useList({ resource: "skills-category", pagination: { mode: "off" } });
  const categories = categoriesResult.data ?? [];

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const payload: Record<string, any> = { ...values };
      if (imageFile) payload.image = imageFile;
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="skills">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          fullWidth
        />

        <Controller
          name="level"
          control={control}
          defaultValue=""
          rules={{ required: "Level is required" }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.level}>
              <InputLabel>Level</InputLabel>
              <Select {...field} label="Level">
                {SKILL_LEVELS.map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select {...field} label="Category">
                {categories.map((c: any) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

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
