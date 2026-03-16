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
  Avatar,
} from "@mui/material";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function SkillEdit() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    setValue,
    refineCore: { onFinish, query },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "skills" } });

  const record = query?.data?.data;

  const { result: categoriesResult } = useList({ resource: "skills-category", pagination: { mode: "off" } });
  const categories = categoriesResult.data ?? [];

  useEffect(() => {
    if (record) {
      setValue("name", record.name ?? "");
      setValue("level", record.level ?? "");
      setValue("category", record.category?._id ?? record.category ?? "");
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
    <Edit saveButtonProps={customSave} resource="skills">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Controller
          name="level"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth>
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
          render={({ field }) => (
            <FormControl fullWidth>
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
