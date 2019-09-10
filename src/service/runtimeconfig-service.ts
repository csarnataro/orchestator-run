import { inject, injectable } from "@msiviero/knit";
import { GoogleApiClient } from "../provider/googleapi-provider";

@injectable()
export class RuntimeConfigService {

  constructor(
    @inject("google:client") private readonly googleApiClient: Promise<GoogleApiClient>,
  ) { }

  public async getApplicationEndpoint() {

    const google = await this.googleApiClient;
    const response = await google
      .client
      .runtimeconfig("v1beta1")
      .projects
      .configs
      .list({
        parent: `projects/${google.projectId}`,
      });

    return response.data;
  }
}
