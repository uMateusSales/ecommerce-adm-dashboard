"use client";

import { Size } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert-modal";
import { useOrigin } from "@/hooks/use-origin";
import { toast } from "react-hot-toast";

interface SizeFormProps {
  data: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

const SizeForm: React.FC<SizeFormProps> = ({ data, ...props }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = data ? "Editar tamanhos" : "Criar tamanho";
  const description = data ? "Editar tamanho" : "Criar novo tamanho";
  const action = data ? "Salvar alterações" : "Criar ";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || { name: "", value: "" },
  });

  const handleSubmit = async (submitData: SizeFormValues) => {
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `${origin}/api/stores/${params.storeId}/sizes/${params.sizeId}`,
          submitData
        );
      } else {
        await axios.post(
          `${origin}/api/stores/${params.storeId}/sizes`,
          submitData
        );
      }
      toast.success("tamanho atualizado com sucesso");
      router.refresh();
      router.push(`${origin}/${params.storeId}/sizes`);
    } catch (error) {
      console.log("[SIZES_SUBMIT]", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/sizes/${params.sizeId}`
      );

      router.push(`${origin}/${params.storeId}/sizes`);
    } catch (error) {
      console.log("[SIZE_DELETE]", error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {data && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-10 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Valor do tamanho"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  );
};

export default SizeForm;
