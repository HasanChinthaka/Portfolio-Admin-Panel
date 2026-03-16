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
  Divider,
} from "@mui/material";

export function SystemFeatureEdit() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);

  const {
    saveButtonProps,
    register,
    handleSubmit,
    control,
    setValue,
    refineCore: { onFinish, query },
  } = useForm({ refineCoreProps: { resource: "system-features" } });

  const record = query?.data?.data;

  useEffect(() => {
    if (record) {
      setValue("siteName", record.siteName ?? "");
      setValue("siteDescription", record.siteDescription ?? "");
      setValue("isMaintenance", record.isMaintenance ?? false);
      setValue("maintenanceMessage", record.maintenanceMessage ?? "");
      setValue("isActive", record.isActive ?? true);
    }
  }, [record]);

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

  const logoSrc = logoPreview ?? record?.logo ?? null;
  const faviconSrc = faviconPreview ?? record?.favicon ?? null;
  const heroSrc = heroPreview ?? record?.heroImage ?? null;

  return (
    <Edit saveButtonProps={customSave} resource="system-features">
      <Stack spacing={2} mt={2}>
        <TextField
          {...register("siteName")}
          label="Site Name"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          {...register("siteDescription")}
          label="Site Description"
          multiline
          rows={3}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Divider textAlign="left">Maintenance</Divider>
        <Controller
          name="isMaintenance"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={!!field.value} />}
              label="Enable Maintenance Mode"
            />
          )}
        />
        <TextField
          {...register("maintenanceMessage")}
          label="Maintenance Message"
          multiline
          rows={2}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Controller
          name="isActive"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={!!field.value} />}
              label="Active Configuration"
            />
          )}
        />

        <Divider textAlign="left">Images</Divider>
        <Box display="flex" gap={3} flexWrap="wrap">
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>Logo</Typography>
            {logoSrc && (
              <img
                src={logoSrc}
                alt="logo preview"
                style={{ maxWidth: "80px", maxHeight: "80px", objectFit: "contain", display: "block", borderRadius: "4px", border: "1px solid rgba(0,0,0,0.12)", marginBottom: "8px" }}
              />
            )}
            <Button variant="outlined" component="label" size="small">
              {record?.logo ? "Replace Logo" : "Upload Logo"}
              <input type="file" hidden accept="image/*" onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setLogoFile(f);
                setLogoPreview(f ? URL.createObjectURL(f) : null);
              }} />
            </Button>
            {logoFile && <Typography variant="body2">{logoFile.name}</Typography>}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>Favicon</Typography>
            {faviconSrc && (
              <img
                src={faviconSrc}
                alt="favicon preview"
                style={{ maxWidth: "48px", maxHeight: "48px", objectFit: "contain", display: "block", borderRadius: "4px", border: "1px solid rgba(0,0,0,0.12)", marginBottom: "8px" }}
              />
            )}
            <Button variant="outlined" component="label" size="small">
              {record?.favicon ? "Replace Favicon" : "Upload Favicon"}
              <input type="file" hidden accept="image/*" onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFaviconFile(f);
                setFaviconPreview(f ? URL.createObjectURL(f) : null);
              }} />
            </Button>
            {faviconFile && <Typography variant="body2">{faviconFile.name}</Typography>}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>Hero Image</Typography>
            {heroSrc && (
              <img
                src={heroSrc}
                alt="hero preview"
                style={{ maxWidth: "200px", maxHeight: "120px", objectFit: "cover", display: "block", borderRadius: "4px", border: "1px solid rgba(0,0,0,0.12)", marginBottom: "8px" }}
              />
            )}
            <Button variant="outlined" component="label" size="small">
              {record?.heroImage ? "Replace Hero" : "Upload Hero"}
              <input type="file" hidden accept="image/*" onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setHeroFile(f);
                setHeroPreview(f ? URL.createObjectURL(f) : null);
              }} />
            </Button>
            {heroFile && <Typography variant="body2">{heroFile.name}</Typography>}
          </Box>
        </Box>
      </Stack>
    </Edit>
  );
}
