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
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";

export function ProjectEdit() {
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
  } = useForm({ refineCoreProps: { resource: "projects" } });

  const record = query?.data?.data;

  const { result: skillsResult } = useList({ resource: "skills", pagination: { mode: "off" } });
  const { result: categoriesResult } = useList({ resource: "projects-category", pagination: { mode: "off" } });
  const { result: clientsResult } = useList({ resource: "clients", pagination: { mode: "off" } });

  const skills = skillsResult?.data ?? [];
  const categories = categoriesResult?.data ?? [];
  const clients = clientsResult?.data ?? [];

  useEffect(() => {
    if (record) {
      setValue("title", record.title ?? "");
      setValue("description", record.description ?? "");
      setValue("githubUrl", record.githubUrl ?? "");
      setValue("liveUrl", record.liveUrl ?? "");
      setValue("demoUrl", record.demoUrl ?? "");
      setValue("isClient", record.isClient ?? false);
      setValue("isPublished", record.isPublished ?? true);
      setValue(
        "techStack",
        (record.techStack ?? []).map((s: any) => s._id ?? s)
      );
      setValue(
        "category",
        (record.category ?? []).map((c: any) => c._id ?? c)
      );
      setValue("client", record.client?._id ?? record.client ?? "");
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

  const displaySrc = previewUrl ?? record?.imageUrl ?? null;

  return (
    <Edit saveButtonProps={customSave} resource="projects">
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

        <Controller
          name="techStack"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Tech Stack</InputLabel>
              <Select
                {...field}
                multiple
                input={<OutlinedInput label="Tech Stack" />}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((id) => {
                      const skill = skills.find((s: any) => s.id === id);
                      return <Chip key={id} label={skill?.name ?? id} size="small" />;
                    })}
                  </Box>
                )}
              >
                {skills.map((s: any) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="category"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                {...field}
                multiple
                input={<OutlinedInput label="Category" />}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((id) => {
                      const cat = categories.find((c: any) => c.id === id);
                      return <Chip key={id} label={cat?.name ?? id} size="small" />;
                    })}
                  </Box>
                )}
              >
                {categories.map((c: any) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <TextField
          {...register("githubUrl")}
          label="GitHub URL"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("liveUrl")}
          label="Live URL"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("demoUrl")}
          label="Demo URL"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Controller
          name="isClient"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={!!field.value} />}
              label="Client Project"
            />
          )}
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
                {previewUrl ? "New Image Preview" : "Current Image"}
              </Typography>
              <img
                src={displaySrc}
                alt="preview"
                style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "contain", display: "block", borderRadius: "4px", border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </Box>
          )}
          <Button variant="outlined" component="label">
            {record?.imageUrl ? "Replace Image" : "Upload Image"}
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
