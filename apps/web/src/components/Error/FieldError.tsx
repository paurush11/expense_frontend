// Helper component for field errors
const FieldError = ({ errors }: { errors?: string[] }) => {
    if (!errors?.length) return null;
    return (
        <div className="mt-1 space-y-1">
            {errors.map((error, index) => (
                <p key={index} className="text-[hsl(var(--destructive))] text-sm">
                    • {error}
                </p>
            ))}
        </div>
    );
};

export default FieldError;