package controlers;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import models.DBConnector;
import models.DBWorker;
import com.fasterxml.jackson.databind.*;
import entities.User;

@WebServlet("/MainServlet")
public class MainServlet extends HttpServlet {
    private DBWorker _dbworker;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        var users = _dbworker.load();

        ObjectMapper mapper = new ObjectMapper();
        String data = mapper.writeValueAsString(users);
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.println(data);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String data = reader.lines().collect(Collectors.joining()); // Сам JSON
        reader.close();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(data);

        var userNode = jsonNode.get("User");
        User user = new User();
        user.setId(userNode.get("id").asInt());
        user.setName(userNode.get("name").asText());
        user.setLastName(userNode.get("lastName").asText());
        user.setAge(userNode.get("age").asInt());
        user.setEmail(userNode.get("email").asText());
        user.setPhone(userNode.get("phone").asText());

        String action = jsonNode.get("action").asText();

        switch (action) {
            case "add" -> {
                _dbworker.add(user);
                response.getWriter().write("Новый пользователь добавлен!");
            }
            case "edit" -> {
                _dbworker.update(user);
                response.getWriter().write("Пользователь изменён!");
            }
            case "delete" -> {
                _dbworker.delete(user);
                response.getWriter().write("Пользователь удалён!");
            }
        }
    }

    public MainServlet() {
        var connection = DBConnector.connect();

        if (connection != null) {
            System.out.println("Соединение установлено!");
            _dbworker = new DBWorker(connection);
        }
        else {
            System.err.println("Не удалось установить соединение!");
        }
    }
}
