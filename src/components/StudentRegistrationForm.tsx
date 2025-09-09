import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
const globalMindsLogoUrl = "/lovable-uploads/8fd5ff83-2d56-44d2-a9bd-fcb2a2591e69.png";

interface FormData {
  name: string;
  email: string;
  phone: string;
  abroad_interest: string;
  country?: string;
}

interface FormErrors {
  [key: string]: string;
}

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    abroad_interest: "",
    country: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Full name is required";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        } else {
          delete newErrors.name;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email address is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
        if (!value.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          delete newErrors.phone;
        }
        break;

      case "abroad_interest":
        if (!value) {
          newErrors.abroad_interest = "Please select an option";
        } else {
          delete newErrors.abroad_interest;
        }
        break;

      case "country":
        if (formData.abroad_interest === "Yes" && !value) {
          newErrors.country = "Please select a country";
        } else {
          delete newErrors.country;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Reset country selection if abroad interest changes to "No"
      if (field === "abroad_interest" && value === "No") {
        updated.country = "";
      }
      return updated;
    });
    validateField(field, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(field => {
      validateField(field, formData[field as keyof FormData]);
    });

    // Check if there are any errors
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors before submitting",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Registration Successful!",
      description: "Your registration has been submitted successfully.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      abroad_interest: "",
      country: "",
    });
    setErrors({});
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        backgroundImage: `url('/lovable-uploads/1eb58819-0735-4cf5-a080-869726a5ac58.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <Card className="relative z-10 w-full max-w-sm sm:max-w-md bg-card/95 backdrop-blur-sm shadow-form rounded-xl overflow-hidden">
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="mb-4">
            <img 
              src={globalMindsLogoUrl} 
              alt="Global Minds India Logo" 
              className="mx-auto mb-4 max-w-[300px] sm:max-w-[400px] w-full h-auto object-contain"
            />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 sm:mb-6">
            Student Registration Form
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <Label className="text-card-foreground text-sm font-medium">
                Full Name
              </Label>
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-input-gradient shadow-input-inset border-none text-sm sm:text-base p-2 sm:p-3 rounded-lg mt-1"
              />
              {errors.name && (
                <span className="text-destructive text-sm block mt-1 text-center">
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <Label className="text-card-foreground text-sm font-medium">
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-input-gradient shadow-input-inset border-none text-sm sm:text-base p-2 sm:p-3 rounded-lg mt-1"
              />
              {errors.email && (
                <span className="text-destructive text-sm block mt-1 text-center">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <Label className="text-card-foreground text-sm font-medium">
                Enter phone number
              </Label>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-input-gradient shadow-input-inset border-none text-sm sm:text-base p-2 sm:p-3 rounded-lg mt-1"
              />
              {errors.phone && (
                <span className="text-destructive text-sm block mt-1 text-center">
                  {errors.phone}
                </span>
              )}
            </div>

            <div>
              <Label className="text-card-foreground text-sm font-medium">
                Interested in Abroad Study?
              </Label>
              <Select
                value={formData.abroad_interest}
                onValueChange={(value) => handleInputChange("abroad_interest", value)}
              >
                <SelectTrigger className="bg-input-gradient shadow-input-inset border-none text-sm sm:text-base p-2 sm:p-3 rounded-lg mt-1">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.abroad_interest && (
                <span className="text-destructive text-sm block mt-1 text-center">
                  {errors.abroad_interest}
                </span>
              )}
            </div>

            {formData.abroad_interest === "Yes" && (
              <div>
                <Label className="text-card-foreground text-sm font-medium">
                  Select Country
                </Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleInputChange("country", value)}
                >
                  <SelectTrigger className="bg-input-gradient shadow-input-inset border-none text-sm sm:text-base p-2 sm:p-3 rounded-lg mt-1">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && (
                  <span className="text-destructive text-sm block mt-1 text-center">
                    {errors.country}
                  </span>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg py-4 sm:py-6 rounded-lg transition-colors duration-300 mt-6"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistrationForm;