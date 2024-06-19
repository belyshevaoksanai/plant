import { signIn } from "@/auth"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit" className="bg-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Войти
      </button>
    </form>
  )
} 