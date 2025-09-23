package io.github.markusdunkel.chatbot;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ChatController {

    private final SimpleChatService chatService;

    public ChatController(SimpleChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody String message) {
        return new ChatResponse(this.chatService.chat(message));
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public void handleOptions() {
        // Spring just needs this to avoid 403
    }
}