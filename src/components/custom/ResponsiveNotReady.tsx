import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';

export const ResponsiveNotReady = () => {
  return (
    <Card className="w-5/6">
      <CardHeader className="space-y-1">
        <img
          src="/images/responsive-not-ready.webp"
          alt="logo"
          className="object-contain w-full"
        />
      </CardHeader>
      <CardContent className="text-center">
        <h1 className="text-xl font-bold">Not Ready</h1>
        <CardDescription>
          The responsive design is not ready yet. Please try again later.
        </CardDescription>
      </CardContent>
    </Card>
  );
};
