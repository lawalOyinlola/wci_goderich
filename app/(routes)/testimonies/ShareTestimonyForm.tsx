"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SectionHeader from "@/components/SectionHeader";
import AvatarCropUploader from "@/components/AvatarCropUploader";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { FileField } from "@/components/form/FileField";
import { CheckboxField } from "@/components/form/CheckboxField";
import { Card } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  FieldSeparator,
  FieldDescription,
  Field,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { CHURCH_INFO, TESTIMONY_CATEGORIES } from "@/lib/constants";

type TestimonyFormValues = {
  name?: string;
  role?: string;
  image: Blob | null;
  type: "written" | "video" | "audio";
  testimony?: string;
  category: string;
  date: string;
  videoFile?: File | null;
  audioFile?: File | null;
  isAnonymous: boolean;
};

const testimonySchema: yup.ObjectSchema<TestimonyFormValues> = yup.object({
  name: yup
    .string()
    .optional()
    .when("isAnonymous", {
      is: false,
      then: (schema) =>
        schema
          .required("Name is required when not submitting anonymously")
          .min(2, "Name must be at least 2 characters")
          .max(100, "Name must not exceed 100 characters"),
      otherwise: (schema) => schema.optional(),
    }),
  role: yup
    .string()
    .optional()
    .when("isAnonymous", {
      is: false,
      then: (schema) =>
        schema
          .required("Role is required when not submitting anonymously")
          .min(2, "Role must be at least 2 characters")
          .max(100, "Role must not exceed 100 characters"),
      otherwise: (schema) => schema.optional(),
    }),
  image: yup.mixed().nullable().optional(),
  type: yup
    .string()
    .oneOf(["written", "video", "audio"], "Invalid testimony type")
    .required("Testimony type is required"),
  testimony: yup.string().when("type", {
    is: "written",
    then: (schema) =>
      schema
        .required("Testimony is required")
        .min(10, "Testimony must be at least 10 characters")
        .max(5000, "Testimony must not exceed 5000 characters"),
    otherwise: (schema) => schema.optional(),
  }),
  category: yup.string().required("Please select a category"),
  date: yup.string().required("Date is required"),
  videoFile: yup
    .mixed()
    .nullable()
    .when("type", {
      is: "video",
      then: (schema) =>
        schema.required("Video file is required for video testimonies"),
      otherwise: (schema) => schema.nullable(),
    }),
  audioFile: yup
    .mixed()
    .nullable()
    .when("type", {
      is: "audio",
      then: (schema) =>
        schema.required("Audio file is required for audio testimonies"),
      otherwise: (schema) => schema.nullable(),
    }),
  isAnonymous: yup.boolean().default(false),
}) as yup.ObjectSchema<TestimonyFormValues>;

const typeOptions = [
  { value: "written", label: "Written Testimony" },
  { value: "video", label: "Video Testimony" },
  { value: "audio", label: "Audio Testimony" },
];

const categoryOptions = TESTIMONY_CATEGORIES.map((cat) => ({
  value: cat.value,
  label: cat.label,
}));

export default function ShareTestimonyForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [uploaderResetToken, setUploaderResetToken] = useState(0);
  const { CONTACT } = CHURCH_INFO;
  const {
    phone: churchPhone = "",
    email: churchEmail = "",
    address: churchAddress = "",
  } = CONTACT;

  const form = useForm<TestimonyFormValues>({
    resolver: yupResolver(testimonySchema),
    defaultValues: {
      name: "",
      role: "",
      image: null,
      type: "written",
      testimony: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      videoFile: null,
      audioFile: null,
      isAnonymous: false,
    },
    mode: "onTouched",
  });

  const testimonyType = form.watch("type");
  const isAnonymous = form.watch("isAnonymous");

  // Clear name/role errors when anonymous is checked
  const previousIsAnonymous = useRef(isAnonymous);
  if (isAnonymous && !previousIsAnonymous.current) {
    form.clearErrors("name");
    form.clearErrors("role");
  }
  previousIsAnonymous.current = isAnonymous;

  const uploadFileWithProgress = async (
    file: File,
    resourceType: "video" | "audio",
    progressCallback?: (progress: number) => void
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("resourceType", resourceType);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          progressCallback?.(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        try {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response.url);
          } else {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.error || "Upload failed"));
          }
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      xhr.addEventListener("timeout", () => {
        reject(new Error("Upload timed out"));
      });

      xhr.open("POST", "/api/upload/media");
      xhr.timeout = 300000; // 5 minute timeout for large uploads
      xhr.send(formData);
    });
  };

  const uploadImage = async (blob: Blob): Promise<string> => {
    const file = new File([blob], `testimony-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "WCI_Goderich/testimonies");

    const response = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to upload image");
    }

    const result = await response.json();
    return result.url;
  };

  const onSubmit = async (data: TestimonyFormValues) => {
    setIsSubmitting(true);
    setUploadProgress(0);

    // Track uploaded files for cleanup if submission fails
    const uploadedFiles: string[] = [];

    try {
      // Upload profile image if provided (0-20%)
      let imageUrl: string | null = null;
      if (imageBlob) {
        setUploadProgress(5);
        imageUrl = await uploadImage(imageBlob);
        uploadedFiles.push(imageUrl);
        setUploadProgress(20);
      } else {
        setUploadProgress(20);
      }

      // Upload media file if needed (20-70%)
      let videoUrl: string | null = null;
      let audioUrl: string | null = null;

      if (data.type === "video" && data.videoFile) {
        videoUrl = await uploadFileWithProgress(
          data.videoFile,
          "video",
          (progress) => {
            // Map progress from 20-70% (video upload is longer)
            setUploadProgress(20 + Math.round(progress * 0.5));
          }
        );
        uploadedFiles.push(videoUrl);
        setUploadProgress(70);
      } else if (data.type === "audio" && data.audioFile) {
        audioUrl = await uploadFileWithProgress(
          data.audioFile,
          "audio",
          (progress) => {
            // Map progress from 20-70% (audio upload is longer)
            setUploadProgress(20 + Math.round(progress * 0.5));
          }
        );
        uploadedFiles.push(audioUrl);
        setUploadProgress(70);
      } else {
        // No media file, skip to 70%
        setUploadProgress(70);
      }

      // For written testimonies, testimony field is required. For video/audio, it's optional description
      const testimonyText =
        data.type === "written"
          ? data.testimony
          : data.testimony || "No description provided";

      // Use "Anonymous" for name/role if submitting anonymously
      const submissionName = data.isAnonymous
        ? "Anonymous"
        : data.name || "Anonymous";
      const submissionRole = data.isAnonymous ? "" : data.role || "";

      // Submit testimony
      const response = await fetch("/api/testimonies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: submissionName,
          role: submissionRole,
          image: imageUrl,
          testimony: testimonyText,
          category: data.category,
          date: data.date,
          type: data.type,
          videoUrl: videoUrl,
          audioUrl: audioUrl,
          // TODO: Add CAPTCHA tokens if required
          hcaptchaToken: null,
          recaptchaToken: null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit testimony");
      }

      // Final submission (70-100%)
      setUploadProgress(90);

      setUploadProgress(100);

      // Show success state
      setSubmitSuccess(true);
      form.reset();
      setImageBlob(null);
      setUploaderResetToken((t) => t + 1);
      setIsSubmitting(false);

      // Reset progress after a brief delay to show completion
      setTimeout(() => {
        setUploadProgress(0);
      }, 500);

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting testimony:", error);

      // Clean up uploaded files if submission failed
      if (uploadedFiles.length > 0) {
        try {
          await fetch("/api/upload/cleanup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ files: uploadedFiles }),
          });
        } catch (cleanupError) {
          console.error("Error cleaning up uploaded files:", cleanupError);
          // Don't block user from seeing the error
        }
      }

      setUploadProgress(0);
      setIsSubmitting(false);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again later."
      );
    }
  };

  if (submitSuccess) {
    return (
      <section id="share-testimony" className="bg-muted py-16">
        <div className="small-container max-w-2xl">
          <Card className="p-8 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
              Testimony Submitted!
            </h3>
            <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Thank you for sharing your testimony. Our team will review it and
              it will be published soon. God bless you!
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="share-testimony" className="bg-muted py-16">
      <div className="small-container max-w-4xl">
        <SectionHeader
          title="Share Your Testimony"
          subtitle="Your Story Matters"
          description="We'd love to hear how God has worked in your life. Share your testimony to encourage and inspire others in our church family."
        />
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="grid grid-cols-2 lg:block lg:space-y-12">
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <h2 className="mb-3 text-lg">Church Office</h2>
                <Link
                  href={`mailto:${churchEmail}`}
                  className="text-primary text-lg hover:underline"
                >
                  {churchEmail}
                </Link>
                <p className="mt-3 text-sm">{churchPhone}</p>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-lg">Church Premises</h2>
              {/* NOTE: Fix to open directions in Google Maps */}
              <p className="text-primary text-lg hover:underline">
                {churchAddress}
              </p>
              <p className="mt-3 text-sm">
                You can submit your testimony to the ushers during any of our
                services.
              </p>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="@container lg:col-span-2"
          >
            <Card className="p-8">
              <div className="space-y-6">
                <FieldGroup>
                  <FieldGroup className="grid gap-6 md:grid-cols-2">
                    <InputField
                      name="name"
                      control={form.control}
                      label="Your Name"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      disabled={isSubmitting}
                    />

                    <InputField
                      name="role"
                      control={form.control}
                      label="Your Role"
                      placeholder="e.g., Church Member, Ministry Leader"
                      autoComplete="organization-title"
                      disabled={isSubmitting}
                    />
                  </FieldGroup>

                  <FieldSeparator />
                  <Field orientation="responsive">
                    <FieldContent>
                      <FieldLabel htmlFor="image">
                        Profile Image (Optional)
                      </FieldLabel>
                      <FieldDescription>
                        Upload a photo of yourself to be displayed with your
                        testimony
                      </FieldDescription>
                    </FieldContent>

                    <div className="flex-center">
                      <AvatarCropUploader
                        id="image"
                        onImageChange={(blob) => {
                          setImageBlob(blob);
                          form.setValue("image", blob);
                          form.clearErrors("image");
                        }}
                        resetToken={uploaderResetToken}
                        disabled={isSubmitting}
                      />
                    </div>
                  </Field>
                  {form.formState.errors.image && (
                    <p className="text-sm text-destructive -mt-4 lg:col-span-2 self-center">
                      {form.formState.errors.image.message}
                    </p>
                  )}
                  <FieldSeparator />
                </FieldGroup>

                <SelectField
                  name="type"
                  control={form.control}
                  label="Testimony Type"
                  placeholder="Select testimony type"
                  options={typeOptions}
                  disabled={isSubmitting}
                />

                {testimonyType === "written" ? (
                  <TextAreaField
                    name="testimony"
                    control={form.control}
                    label="Your Testimony"
                    placeholder="Share your story of how God has worked in your life..."
                    rows={8}
                    disabled={isSubmitting}
                  />
                ) : testimonyType === "video" ? (
                  <>
                    <FileField
                      name="videoFile"
                      control={form.control}
                      label="Video File"
                      accept="video/*"
                      description="Upload a video file (max 100MB). Supported formats: MP4, MOV, AVI, etc."
                      uploadProgress={uploadProgress}
                      maxSize={100 * 1024 * 1024} // 100MB
                      disabled={isSubmitting}
                    />
                    <TextAreaField
                      name="testimony"
                      control={form.control}
                      label="Video Summary"
                      placeholder="Provide a brief summary of your video testimony..."
                      rows={4}
                      disabled={isSubmitting}
                    />
                  </>
                ) : (
                  <>
                    <FileField
                      name="audioFile"
                      control={form.control}
                      label="Audio File"
                      accept="audio/*"
                      description="Upload an audio file (max 50MB). Supported formats: MP3, WAV, M4A, etc."
                      uploadProgress={uploadProgress}
                      maxSize={50 * 1024 * 1024} // 50MB
                      disabled={isSubmitting}
                    />
                    <TextAreaField
                      name="testimony"
                      control={form.control}
                      label="Audio Summary"
                      placeholder="Provide a brief summary of your audio testimony..."
                      rows={4}
                      disabled={isSubmitting}
                    />
                  </>
                )}

                <FieldSet>
                  <FieldSeparator />
                  <FieldGroup className="grid gap-6 md:grid-cols-2">
                    <SelectField
                      name="category"
                      control={form.control}
                      label="Category"
                      placeholder="Select a category"
                      options={categoryOptions}
                      disabled={isSubmitting}
                    />

                    <InputField
                      name="date"
                      control={form.control}
                      label="Date"
                      type="date"
                      description="Date when this testimony occurred"
                      disabled={isSubmitting}
                    />
                  </FieldGroup>
                </FieldSet>

                <CheckboxField
                  name="isAnonymous"
                  control={form.control}
                  label="Submit anonymously"
                  description="Your name and role will not be displayed publicly"
                  disabled={isSubmitting}
                />

                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  text={
                    isSubmitting
                      ? uploadProgress > 0
                        ? `Uploading... ${uploadProgress}%`
                        : "Submitting..."
                      : "Submit Testimony"
                  }
                  icon={<PaperPlaneTiltIcon />}
                />
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
}
