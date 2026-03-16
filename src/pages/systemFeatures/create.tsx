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
  Divider,
} from "@mui/material";

export function SystemFeatureCreate() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    refineCore: { onFinish },
    formState: {},
  } = useForm({ refineCoreProps: { resource: "system-features" } });

  const customSave = {
    ...saveButtonProps,
    onClick: handleSubmit((values) => {
      const payload: Record<string, any> = { ...values };
      if (logoFile) payload.logo = logoFile;
      if (faviconFile) payload.favicon = faviconFile;
      if (heroFile) payload.heroImage = heroFile;
      onFinish(payload);
    }),
  };

  return (
    <Create saveButtonProps={customSave} resource="system-features">
      <Stack spacing={2} mt={2}>
        <TextField {...register("siteName")} label="Site Name" fullWidth />
        <TextField
          {...register("siteDescription")}
          label="Site Description"
          multiline
          rows={3}
          fullWidth
        />

        <Divider textAlign="left">Maintenance</Divider>
        <Controller
          name="isMaintenance"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Enable Maintenance Mode"
            />
          )}
        />
        <TextField
          {...register("maintenanceMessage")}
          label="Maintenance Message"
          multiline
          rows={2}
          fullWidth
        />

        <Controller
          name="isActive"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Active Configuration"
            />
          )}
        />

        <Divider textAlign="left">Images</Divider>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box>
            <Button variant="outlined" component="label" size="small">
              Upload Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              />
            </Button>
            {logoFile && <Typography variant="body2">{logoFile.name}</Typography>}
          </Box>
          <Box>
            <Button variant="outlined" component="label" size="small">
              Upload Favicon
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setFaviconFile(e.target.files?.[0] ?? null)}
              />
            </Button>
            {faviconFile && <Typography variant="body2">{faviconFile.name}</Typography>}
          </Box>
          <Box>
            <Button variant="outlined" component="label" size="small">
              Upload Hero Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setHeroFile(e.target.files?.[0] ?? null)}
              />
            </Button>
            {heroFile && <Typography variant="body2">{heroFile.name}</Typography>}
          </Box>
        </Box>
      </Stack>
    </Create>
  );
}
