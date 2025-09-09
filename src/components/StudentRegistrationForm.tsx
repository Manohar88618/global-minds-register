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
  event_name: string;
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
    event_name: "",
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

      case "event_name":
        if (!value.trim()) {
          newErrors.event_name = "Event name is required";
        } else {
          delete newErrors.event_name;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      event_name: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-form-gradient flex items-center justify-center p-5">
      <Card className="w-full max-w-md bg-card shadow-form rounded-xl overflow-hidden">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <img 
              src={globalMindsLogoUrl} 
              alt="Global Minds India Logo" 
              className="mx-auto mb-4 max-w-[600px] w-full h-auto object-contain"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-card-foreground mb-6">
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
                className="bg-input-gradient shadow-input-inset border-none text-base p-3 rounded-lg mt-1"
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
                className="bg-input-gradient shadow-input-inset border-none text-base p-3 rounded-lg mt-1"
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
                className="bg-input-gradient shadow-input-inset border-none text-base p-3 rounded-lg mt-1"
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
                <SelectTrigger className="bg-input-gradient shadow-input-inset border-none text-base p-3 rounded-lg mt-1">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
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

            <div>
              <Input
                type="text"
                placeholder="Event Name"
                value={formData.event_name}
                onChange={(e) => handleInputChange("event_name", e.target.value)}
                className="bg-input-gradient shadow-input-inset border-none text-base p-3 rounded-lg"
              />
              {errors.event_name && (
                <span className="text-destructive text-sm block mt-1 text-center">
                  {errors.event_name}
                </span>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-lg transition-colors duration-300 mt-6"
            >
              Submit Registration
            </Button>
          </form>

          <a 
            href="#" 
            className="inline-block mt-4 bg-success-green hover:bg-success-green/90 text-white py-2 px-5 rounded-lg no-underline text-base transition-colors duration-300"
          >
            Contact Support
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistrationForm;