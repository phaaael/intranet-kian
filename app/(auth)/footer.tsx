export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-black text-white py-5 w-full">
            <div className="max-w-screen-xl mx-auto text-center pt-3">
                <div className="border-t border-white w-1/3 mx-auto" />
                <p className="text-sm mt-2">Todos os direitos reservados © {currentYear} Kian Iluminação</p>
            </div>
        </footer>
    )
}