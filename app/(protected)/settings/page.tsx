"use client"
import { PageHeader } from "../_components/page-header"
import { SettingsForm } from "../_components/settings-form"

export default function Settings() {
  return (
    <div className="w-full h-full">
      <PageHeader label="Settings"/>
      <SettingsForm />
    </div>
  )
}
