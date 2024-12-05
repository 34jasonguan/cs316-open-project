import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

const formSchema = z.object({
    userID: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    rememberMe: z.boolean().default(false),
  });

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userID: '',
      password: '',
      rememberMe: false,
    },
  });


  // Handle login form submission
  const handleLogin = async (values) => {
    // e.preventDefault(); // Prevent page reload on form submit
    const userIDInput = values.userID;
    const passwordInput = values.password;

    // setIsLoading(true)
    
    const response1 = await fetch(`/api/getPassword?netID=${userIDInput}`);
    const response2 = await fetch(`/api/getAccessLevel?netID=${userIDInput}`);
    const response3 = await fetch(`/api/getUserByClassNetID?netID=${userIDInput}`);

    if (response1.ok && response2.ok && response3.ok) {
        const returnedJSON1 = await response1.json();
        const returnedJSON2 = await response2.json();
        const returnedJSON3 = await response2.json();
        const passwordTrue = returnedJSON1['password'];
        const hasStaffAccess = (['RA', 'RC'].includes(returnedJSON2['class'])) || false;
        const userFirstName = returnedJSON3['firstname'];
        //const hasStaffAccess = (returnedJSON2['class'] && returnedJSON2['class'] in ['RA', 'RC']) || false; -- this always evals to false

        // Check if the userID exists and the password is correct
        if (passwordTrue && passwordInput && passwordTrue == passwordInput) {
            localStorage.setItem('userID', userIDInput);
            localStorage.setItem('hasStaffAccess', hasStaffAccess);
            localStorage.setItem('userFirstName', userFirstName);
            toast({
                title: 'Login Successful',
                description: 'You have successfully logged in.',
              })
            router.push('/dashboard'); // Redirect to the dashboard page
        } else {
            window.alert('Invalid NetID or password!'); // Show error message if credentials are incorrect
            toast({
                title: 'Login Failed',
                description: 'Invalid userID or password.',
                variant: 'destructive',
              })
        }
    }  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <Form {...form}>
          <form style = {{border: '1px solid white'}} onSubmit={form.handleSubmit(handleLogin)}  className="space-y-6">
            <FormField
              control={form.control}
              name="userID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User NetID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your user netID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember me</FormLabel>
                    <FormDescription>
                      Keep me logged in on this device
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-[#00247D]" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            <div className="mt-4 text-center">
              <Link href="/register" className="text-sm text-blue-600 hover:underline">
                Don't have an account? Register here
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
};