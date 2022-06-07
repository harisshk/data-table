import axios from "axios";
import { candidateServiceUrl } from '../constants/url'


export const getAllCandidates = async () => {
    try {
        const response = await axios.get(`${candidateServiceUrl}/all`)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};
export const getCandidateById = async (candidateId) => {
    try {
        const response = await axios.get(`${candidateServiceUrl}/${candidateId}`)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};

export const editCandidateData = async (candidateId, payload) => {
    try {
        const response = await axios.put(`${candidateServiceUrl}/edit/${candidateId}`, payload)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};

export const createCandidate = async (payload) => {
    try {
        const response = await axios.post(`${candidateServiceUrl}/create`, payload)
        console.log(response)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};