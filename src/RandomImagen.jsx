import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RandomImagen({ onNewImage }) {
    const [imagenUrl, setImagenUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRandomImagen = async () =>  {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("https://picsum.photos/600/400");

            const finalUrl = response.request.responseURL;

            const imageResponse = await axios.get(finalUrl, { responseType: "blob" });

            const localUrl = URL.createObjectURL(imageResponse.data);


            setImagenUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return localUrl;
            });

            if (onNewImage) onNewImage();
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la imagen. Intenta de nuevo.");
            } finally {
            setLoading(false);
            }     
        };

        useEffect(() => {
            fetchRandomImagen();
            return () => {
                if (imagenUrl) URL.revokeObjectURL(imagenUrl);
            };
        }, []);

        return (
            <div className="random-imagen-wrapper">
                <div className="image-box">
                    {loading && <p className="loader">Cargando...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && !error && imagenUrl && (
                        <img src={imagenUrl} alt="Random" className="random-imagen" />
                    )}
                </div>
                <button
                    className="fetch-button"
                    onClick={fetchRandomImagen}
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Fetch New Random Image"}
                </button>
            </div>
        );
    }
