import Link from 'next/link'

export default function footer(){
    return (
        <div class="footer">
            <Link href="/contact"k>
                <a className="footer-link">contact</a>
            </Link>
        </div>
    )
}