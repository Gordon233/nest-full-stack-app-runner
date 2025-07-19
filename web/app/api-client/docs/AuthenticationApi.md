# AuthenticationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authenticationControllerSignIn**](#authenticationcontrollersignin) | **POST** /authentication/sign-in | |
|[**authenticationControllerSignUp**](#authenticationcontrollersignup) | **POST** /authentication/sign-up | |

# **authenticationControllerSignIn**
> authenticationControllerSignIn(signInDto)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    SignInDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let signInDto: SignInDto; //

const { status, data } = await apiInstance.authenticationControllerSignIn(
    signInDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signInDto** | **SignInDto**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authenticationControllerSignUp**
> authenticationControllerSignUp(signUpDto)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    SignUpDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let signUpDto: SignUpDto; //

const { status, data } = await apiInstance.authenticationControllerSignUp(
    signUpDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signUpDto** | **SignUpDto**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

