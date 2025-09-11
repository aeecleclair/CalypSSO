"use client";

import { VariablesContext } from "@/components/custom/Variables";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ReactNode, useContext } from "react";

interface SuccessCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  showDownloadButtons?: boolean;
}

export const SuccessCard = ({
  title,
  description,
  icon,
  showDownloadButtons = false,
}: SuccessCardProps) => {
  const { appStoreUrl, playStoreUrl } = useContext(VariablesContext);
  return (
    <div className="m-4 flex h-screen [&>div]:w-full">
      <Card className="m-auto rounded-xl border bg-white bg-opacity-80 shadow backdrop-blur">
        <CardHeader>
          <CardTitle>
            <div className="flex w-full items-center">{icon}</div>
            <div>
              <h1 className="text-center text-2xl">{title}</h1>
            </div>
          </CardTitle>
          <CardDescription className="w-full min-w-[400px] text-center text-base">
            {description}
            {showDownloadButtons && (
              <div className="mt-4 flex justify-center space-x-4">
                {appStoreUrl && (
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/calypsso/app_store_button.png"
                      alt="Download on the App Store"
                      width={135}
                      height={40}
                    />
                  </a>
                )}
                {playStoreUrl && (
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/calypsso/play_store_button.png"
                      alt="Download on the Play Store"
                      width={135}
                      height={40}
                    />
                  </a>
                )}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="w-full text-center text-sm">
            Vous pouvez fermer cette fenêtre
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
