"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [volume, setVolume] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.start()
      setIsRecording(true)

      mediaRecorder.ondataavailable = (e) => {
        // Handle the recorded audio data here
        const audioUrl = URL.createObjectURL(e.data)
        console.log("Recording finished, audio URL:", audioUrl)
      }

      // Set up audio analysis
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      audioContextRef.current = audioContext
      const analyser = audioContext.createAnalyser()
      analyserRef.current = analyser
      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)

      analyser.fftSize = 256
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength
        setVolume(average / 255) // Normalize to 0-1 range
        animationFrameRef.current = requestAnimationFrame(updateVolume)
      }

      updateVolume()
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
      setVolume(0)
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const indicatorSize = 16 + volume * 32 // Min 16px, Max 48px

  return (
    <div className="flex flex-col items-center gap-8 p-4 w-full">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={toggleRecording}
          className="bg-[#009DFF] text-white px-4 py-1 rounded-full text-sm hover:bg-[#0081D1] transition-colors"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

        <div className="w-24 h-24 rounded-full bg-black relative shadow-[0_0_15px_rgba(0,157,255,0.3)]">
          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full bg-[#009DFF] transition-all duration-75"
                style={{
                  width: `${indicatorSize}px`,
                  height: `${indicatorSize}px`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <Textarea placeholder="Ask A Question!" className="w-full text-center border rounded-md px-4 py-2 min-h-80" />
      </div>
    </div>
  )
}

