import { useState } from "@chakra-ui/react";
import { useToast } from "react";

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const toast = useToast();
}