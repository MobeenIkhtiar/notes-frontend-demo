import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from "react"
import { X } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import apiService from "@/services/api.Service";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Please enter some text.",
  }),
  password: z.string().optional(),
})

const Home = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      password: "",
    },
  })
  const [loading, setLoading] = React.useState(false)
  const [isEnabled, setIsEnabled] = React.useState(false)
  const [link, setLink] = React.useState('')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const payload = {
        Message : values?.text,
        Passoword: isEnabled ? values?.password : '',
        IsPassoword:isEnabled
      }
      const response = await apiService.createMessageLink(payload)
     console.log(response?.url)
      if(response){
        setLink(response?.url);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <div className="w-full max-w-2xl mx-auto p-4 mt-15">
      <h1 className="text-4xl font-bold text-center">
        Welcome!
      </h1>
      {
        link && (
          <div className="relative my-5 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm mt-10">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <Link to={link}  className="text-blue-800 font-medium truncate">
                  {link}
                </Link>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 ml-2 cursor-pointer"
                onClick={() => setLink('')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      }
      {
        !link && (<div className="my-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your text here..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter any text you want to save.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <Switch
                  id="enable-password"
                  checked={isEnabled}
                  onCheckedChange={setIsEnabled}
                />
                <label htmlFor="enable-password">Enable Password</label>
              </div>

              {isEnabled && (
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
              )}

              <Button type="submit"> {loading ? <Spinner size="small" className="text-secondary" /> : "Save"}</Button>
            </form>
          </Form>
        </div>)
      }
    </div>
  );
};

export default Home;
