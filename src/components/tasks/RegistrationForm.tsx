
import React, {useState, useEffect, useMemo, useCallback} from "react"


interface FormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}
interface Errors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
export const RegistrationForm:React.FC = () => {


    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      const [errors, setErrors] = useState<Errors>({});
      const [loading, setLoading] = useState<boolean>(false);
      const validate = useCallback((): Errors => {
        const newErrors: Errors = {};
    
        if (!formData.name.trim()) newErrors.name = 'Name is required';
    
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
    
        if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
    
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
    
        return newErrors;
      }, [formData]);
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
    
        if (Object.keys(validationErrors).length) {
          setErrors(validationErrors);
          return;
        }
    
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        console.log('Registered user:', formData);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setErrors({});
        setLoading(false);
      };
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          };
        const isDisabled = Object.values(formData).some(field => !field);
    return <div>
        <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password}</p>}

      <input
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <button type="submit" disabled={isDisabled || loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
    </div>
}