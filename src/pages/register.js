import { useState } from 'react'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import AsyncSelect from 'react-select/async';

const formSchema = z.object({
    id: z.string().min(3, { message: 'User ID must be at least 3 characters long' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    phone: z.string().regex(/^\d{10}$/, { message: 'Invalid phone number' }),
    email: z.string().email({ message: 'Invalid email address' }),
    role: z.enum(['student', 'RA', 'RC'], { required_error: 'Please select a role' }),
    year: z.enum(['freshman', 'sophomore', 'junior', 'senior'], { required_error: 'Please select a year' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  });

export default function RegisterPage() {
    const [stuInput, setStuInput] = useState([]);
    const [raInput, setRAInput] = useState([]);
    const [rcInput, setRCInput] = useState([]);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            role: undefined,
            year: undefined,
            student: [],
            ra: [],
            rc: [],
        },
    })
    const watchRole = form.watch("role");

    // Handle create account form submission
    const handleRegister = async (values) => {
        // e.preventDefault(); // Prevent page reload on form submit
        const idInput = values.id;
        const firstnameInput = values.firstName;
        const lastnameInput = values.lastName;
        const phoneInput = values.phone;
        const emailInput = values.email;
        const classInput = values.role;
        const yearInput = values.year;
        const passwordInput = values.password;

        // setIsLoading(true)

        const userInsertedData = {
            'netID': idInput,
            'firstname': firstnameInput,
            'lastname': lastnameInput,
            'phone': phoneInput,
            'email': emailInput, 
            'Class': classInput,
            'year': yearInput,
            'students': stuInput,
            'RAs': raInput,
            'RCs': rcInput,
            'password': passwordInput
        };
        
        const response = await fetch(`/api/insertUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userInsertedData)
        });

        // setIsLoading(false)

        if (response.ok) {
            window.alert('Account created successfully!');
            toast({
                title: 'Registration Successful',
                description: 'Your account has been created.',
              })
            router.push('/');
        }
    };

    const promiseOptions = async (inputValue, searchedClass) => {
        let options = [];

        if (inputValue.length > 0) {
            try {
                const response = await fetch(`/api/getUsersByClassNetID?searchedClass=${searchedClass}&inputValue=${inputValue}`);
                
                if (response.ok) {
                    const selectedUsers = await response.json();
                    options = (selectedUsers.length > 0) ? selectedUsers.map(user => {return {value: user.netid, label: user.firstname + ' ' + user.lastname};}) : [];
                } else {
                const errorData = await response.json();
                // generatedOutput = errorData.message || 'An error occurred';
                }
            } catch (error) {
                console.error('Error fetching availability:', error);
                // generatedOutput = 'Failed to fetch availability.';
            }
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(options);
          }, 1000);
        })
    };

    return (
        <div>
        <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">Enter your details to register</p>
        </div>
        <Form {...form}>
          <form style = {{border: '1px solid white'}} onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your user ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email address" {...field} />
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
                    <Input type="password" placeholder="Create a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="RA">RA</SelectItem>
                      <SelectItem value="RC">RC</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(['student', 'RA'].includes(watchRole)) && (
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="sophomore">Sophomore</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />)}
            {(['RA'].includes(watchRole)) && (
            <FormField
              control={form.control}
              name="student"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resident:</FormLabel>
                  <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue) => promiseOptions(inputValue, 'student')}
                                value={stuInput}
                                onChange={(e) => setStuInput(e)}
                            />
                  <FormMessage />
                </FormItem>
              )}
            />)}
            {(['student', 'RC'].includes(watchRole)) && (
            <FormField
              control={form.control}
              name="ra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RA:</FormLabel>
                  <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue) => promiseOptions(inputValue, 'RA')}
                                value={raInput}
                                onChange={(e) => setRAInput(e)}
                            />
                  <FormMessage />
                </FormItem>
              )}
            />)}
            {(['RA'].includes(watchRole)) && (
            <FormField
              control={form.control}
              name="rc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RC:</FormLabel>
                  <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue) => promiseOptions(inputValue, 'RC')}
                                value={rcInput}
                                onChange={(e) => setRCInput(e)}
                            />
                  <FormMessage />
                </FormItem>
              )}
            />)}
            <Button type="submit" className="w-full bg-[#00247D]" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
            {/* <h1 style = {styles.heading}>Create an Account</h1>
            <form onSubmit={handleRegister}>
                <div type="container">
                    <label><b>NetID</b></label>
                    <input type="text" placeholder="Enter NetID" name="userid" id="userid" value={idInput} onChange={(e) => setIDInput(e.target.value)} required/>
                    <label><b>First name</b></label>
                    <input type="text" placeholder="Enter first name" name="fname" id="firstname" value={firstnameInput} onChange={(e) => setFirstnameInput(e.target.value)} required/>
                    <label><b>Last name</b></label>
                    <input type="text" placeholder="Enter last name" name="lname" id="lastname" value={lastnameInput} onChange={(e) => setLastnameInput(e.target.value)} required/>
                    <label><b>Phone number</b></label>
                    <input type="text" placeholder="Enter phone number" name="phone" id="phone" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} required/>
                    <label><b>Email address</b></label>
                    <input type="text" placeholder="Enter email address" name="email" id="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required/>
                    <label><b>Role Type:</b>
                        <select
                            value={classInput}
                            onChange={(e) => setClassInput(e.target.value)}
                            style={styles.select}
                            required
                        >
                            <option value=""></option>
                            <option value="student">Student</option>
                            <option value="RA">RA</option>
                            <option value="RC">RC</option>
                        </select>
                    </label>
                    {(classInput === 'student' || classInput === 'RA') && (
                        <label htmlFor="year"><b>Year:</b>
                            <select
                                value={yearInput}
                                onChange={(e) => setYearInput(e.target.value)}
                                style={styles.select}
                                required
                            >
                                <option value=""></option>
                                <option value="freshman">Freshman</option>
                                <option value="sophomore">Sophomore</option>
                                <option value="junior">Junior</option>
                                <option value="senior">Senior</option>
                            </select>
                        </label>
                    )}
                    
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter password" name="pwd" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required/>
                    <button type="login">Create!</button>
                </div>

            </form> */}
        </div>
    );
}



// CAVEATS:
//   1. Database too redundant. (hasRA & hasRC)
//   2. One student may have multiple RAs, and one RA may have multiple RCs
//   3. Phone number / Email might be invalid
//   4. Mallicious inputs to break url passing e.g., '&' to retrieve all resident/RA/RC information