import { TCredit } from "../types";
import { ApiService } from "../utils/api";

export async function createCredit(formData: any) {
  try {
    const body = {
      firstName: formData.first_name,
      lastName: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      identification: formData[formData.identification],
      department: formData.department,
      municipio: formData.municipio,
      direction: formData.direction,
      income: formData.income,
      document: formData.document,
      selfie: formData.selfie,
    };
    const result = await ApiService.post({
      url: "credits",
      body,
    });
    return {
      status: result.status,
    };
  } catch (error) {
    console.error("Error: " + error);
    return { status: "fail", error };
  }
}

export async function getCredits() {
  const credits = await ApiService.get<{ credits: TCredit[] }>({
    url: "credits",
  });
  return credits.data?.credits ?? [];
}

export default async function getCreditByID(id: string) {
  const credits = await ApiService.get<{ credit: TCredit }>({
    url: `credits/${id}`,
  });
  return credits.data?.credit ?? [];
}
