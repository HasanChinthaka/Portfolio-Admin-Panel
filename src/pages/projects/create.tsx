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
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";

export function ProjectCreate() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "projects" } });

  const { data: skillsData } = useList({ resource: "skills", pagination: { mode: "off" } });
  const { data: categoriesData } = useList({ resource: "projects-category", pagination: { mode: "off" } });
  const { data: clientsData } = useList({ resource: "clients", pagination: { mode: "off" } });

  const skills = skillsData?.data ?? [];
  const categories = categoriesData?.data ?? [];
  const clients = clientsData?.data ?? [];

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const payload: Record<string, any> = { ...values };
      if (imageFile) payload.image = imageFile;
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="projects">
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

        <TextField {...register("githubUrl")} label="GitHub URL" fullWidth />
        <TextField {...register("liveUrl")} label="Live URL" fullWidth />
        <TextField {...register("demoUrl")} label="Demo URL" fullWidth />

        <Controller
          name="isClient"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
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
              control={<Switch {...field} checked={field.value} />}
              label="Published"
            />
          )}
        />

        <Box>
          <Button variant="outlined" component="label">
            Upload Image
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
