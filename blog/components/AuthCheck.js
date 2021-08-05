import { useContext, useState } from "react";
import Link from "next/link";
import { UserContext } from "../lib/context";

export default function AuthCheck(props) {
    const { user, username } = useContext(UserContext);
    const fallbackPrompt = user ? 
    "Before you can do that, you'll need to pick a username." : 
    "You need to sign in to view this content.";
    return (username ?
        props.children :
        props.fallback ||
        <div>
            {fallbackPrompt}
            <Link href='/enter'>
                <button className='btn-standard'>
                    Got it! Take me to the login/signup page.
                </button>
            </Link>
        </div>);
}