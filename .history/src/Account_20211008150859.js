import { useEffect } from "react";

export default function Account({ sessions }) {
    const [loading, setLoading] = useState(true);
    const [username, setUserName] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const toast = useToast();

    useEffect(() => {
        getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
        } catch (error) {

        }
    }
}